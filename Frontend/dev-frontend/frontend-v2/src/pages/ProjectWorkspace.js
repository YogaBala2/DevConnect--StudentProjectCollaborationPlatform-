import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getProjectTasks,
  createTask,
  updateTaskStatus,
} from "../api/taskApi";

import {
  createReport,
  getProjectReports,
} from "../api/reportApi";

import {
  getProjectById,
} from "../api/projectApi";

import "../styles/project.css";

const ProjectWorkspace = () => {
  const { id } = useParams();

  const [project, setProject] =
    useState(null);

  const [tasks, setTasks] =
    useState([]);

  const [reports, setReports] =
    useState([]);

  const [isOwner, setIsOwner] =
    useState(false);

  const [taskForm, setTaskForm] =
    useState({
      title: "",
      description: "",
      assignedTo: "",
      priority: "Medium",
      deadline: "",
    });

  const [reportForm, setReportForm] =
    useState({
      todayWork: "",
      tomorrowPlan: "",
      hoursWorked: "",
      blockers: "",
    });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const projectData =
        await getProjectById(id);

      setProject(projectData);

      const currentUser =
        JSON.parse(
          localStorage.getItem("user")
        );

      setIsOwner(
        projectData.owner?._id ===
          currentUser?._id
      );

      const taskData =
        await getProjectTasks(id);

      setTasks(taskData || []);

      const reportData =
        await getProjectReports(id);

      setReports(reportData || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskChange = (e) => {
    setTaskForm({
      ...taskForm,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleReportChange = (e) => {
    setReportForm({
      ...reportForm,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleCreateTask =
    async (e) => {
      e.preventDefault();

      try {
        await createTask({
          projectId: project._id,
          ...taskForm,
        });

        alert(
          "Task Created Successfully"
        );

        setTaskForm({
          title: "",
          description: "",
          assignedTo: "",
          priority: "Medium",
          deadline: "",
        });

        loadData();
      } catch (error) {
        console.log(error);
      }
    };

  const handleReportSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await createReport({
          projectId: id,
          ...reportForm,
        });

        alert(
          "Daily Report Submitted"
        );

        setReportForm({
          todayWork: "",
          tomorrowPlan: "",
          hoursWorked: "",
          blockers: "",
        });

        loadData();
      } catch (error) {
        console.log(error);
      }
    };

  const handleStatusChange =
    async (taskId, status) => {
      try {
        await updateTaskStatus(
          taskId,
          status
        );

        loadData();
      } catch (error) {
        console.log(error);
      }
    };

  const totalTasks =
    tasks.length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  const inProgressTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "In Progress"
    ).length;

  const todoTasks =
    tasks.filter(
      (task) =>
        task.status === "Todo"
    ).length;

  const progressPercentage =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks /
            totalTasks) *
            100
        );

  if (!project) {
    return (
      <>
        <Navbar />
        <h2>Loading...</h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1 className="page-title">
          Project Workspace
        </h1>

        {/* DAILY REPORT */}
        <div className="detail-card">
          <h2>
            Daily Progress Report
          </h2>

          <form
            onSubmit={
              handleReportSubmit
            }
          >
            <textarea
              name="todayWork"
              placeholder="What did you do today?"
              value={
                reportForm.todayWork
              }
              onChange={
                handleReportChange
              }
              required
            />

            <textarea
              name="tomorrowPlan"
              placeholder="Plan for tomorrow"
              value={
                reportForm.tomorrowPlan
              }
              onChange={
                handleReportChange
              }
              required
            />

            <input
              type="number"
              name="hoursWorked"
              placeholder="Hours Worked"
              value={
                reportForm.hoursWorked
              }
              onChange={
                handleReportChange
              }
            />

            <textarea
              name="blockers"
              placeholder="Any blockers?"
              value={
                reportForm.blockers
              }
              onChange={
                handleReportChange
              }
            />

            <button
              type="submit"
              className="project-btn"
            >
              Submit Report
            </button>
          </form>
        </div>

        {/* PROGRESS */}
        <div className="detail-card">
          <h2>
            Project Progress
          </h2>

          <p>
            Total: {totalTasks} |
            Completed:{" "}
            {completedTasks} |
            In Progress:{" "}
            {inProgressTasks} |
            Todo: {todoTasks}
          </p>

          <p>
            Progress:
            {" "}
            {progressPercentage}%
          </p>
        </div>

        {/* OWNER ONLY */}
        {isOwner && (
          <div className="detail-card">
            <h2>Create Task</h2>

            <form
              onSubmit={
                handleCreateTask
              }
            >
              <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={taskForm.title}
                onChange={
                  handleTaskChange
                }
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={
                  taskForm.description
                }
                onChange={
                  handleTaskChange
                }
              />

              <select
                name="assignedTo"
                value={
                  taskForm.assignedTo
                }
                onChange={
                  handleTaskChange
                }
              >
                <option value="">
                  Assign Member
                </option>

                {project.members?.map(
                  (member) => (
                    <option
                      key={member._id}
                      value={
                        member._id
                      }
                    >
                      {member.name}
                    </option>
                  )
                )}
              </select>

              <select
                name="priority"
                value={
                  taskForm.priority
                }
                onChange={
                  handleTaskChange
                }
              >
                <option>Low</option>
                <option>
                  Medium
                </option>
                <option>High</option>
              </select>

              <input
                type="date"
                name="deadline"
                value={
                  taskForm.deadline
                }
                onChange={
                  handleTaskChange
                }
              />

              <button
                type="submit"
                className="project-btn"
              >
                Create Task
              </button>
            </form>
          </div>
        )}

        {/* TASKS */}
        <div className="detail-card">
          <h2>Tasks</h2>

          {tasks.map((task) => (
            <div
              key={task._id}
              className="request-card"
            >
              <h3>{task.title}</h3>

              <p>
                {task.description}
              </p>

              <select
                value={task.status}
                onChange={(e) =>
                  handleStatusChange(
                    task._id,
                    e.target.value
                  )
                }
              >
                <option value="Todo">
                  Todo
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>

              <p>
                Priority:
                {" "}
                {task.priority}
              </p>

              <p>
                Assigned:
                {" "}
                {task.assignedTo
                  ?.name ||
                  "Unassigned"}
              </p>
            </div>
          ))}
        </div>

        {/* TEAM UPDATES */}
        <div className="detail-card">
          <h2>Team Updates</h2>

          {reports.length === 0 ? (
            <p>No Reports Yet</p>
          ) : (
            reports.map(
              (report) => (
                <div
                  key={
                    report._id
                  }
                  className="request-card"
                >
                  <h3>
                    {
                      report.user
                        ?.name
                    }
                  </h3>

                  <p>
                    <strong>
                      Today:
                    </strong>{" "}
                    {
                      report.todayWork
                    }
                  </p>

                  <p>
                    <strong>
                      Tomorrow:
                    </strong>{" "}
                    {
                      report.tomorrowPlan
                    }
                  </p>

                  <p>
                    <strong>
                      Hours:
                    </strong>{" "}
                    {
                      report.hoursWorked
                    }
                  </p>

                  <p>
                    <strong>
                      Blockers:
                    </strong>{" "}
                    {
                      report.blockers
                    }
                  </p>
                </div>
              )
            )
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectWorkspace;