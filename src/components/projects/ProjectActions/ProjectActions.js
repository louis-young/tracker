import React, { useContext, useState, useEffect } from "react";

import { useHistory, useParams } from "react-router-dom";

import { ROUTES } from "../../../constants/constants";

import { ClientsContext } from "../../../context/ClientsContext";
import { ProjectsContext } from "../../../context/ProjectsContext";

import Breadcrumb from "../../Breadcrumbs/Breadcrumb/Breadcrumb";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";
import Loading from "../../Loading/Loading";

const initialFields = {
  client: "",
  stage: "",
  status: "",
  type: "",
  notes: "",
  action: "",
};

const stages = ["Research", "Concept", "Design", "Build", "Review", "Launch"];

const statuses = ["Working", "Hold", "Waiting", "Chase", "Parked"];

const types = ["WordPress", "WooCommerce", "ProcessWire", "Static"];

const ProjectActions = () => {
  const { id } = useParams();

  const history = useHistory();

  const editing = id;

  const [fields, setFields] = useState(initialFields);

  const { projects, editMutation, addMutation } = useContext(ProjectsContext);

  const { clients } = useContext(ClientsContext);

  const editableProject = projects?.find((project) => project.id === id);

  useEffect(() => {
    if (!editableProject) {
      return;
    }

    setFields(editableProject);
  }, [editableProject]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editing) {
      editMutation.mutate(fields);
    } else {
      addMutation.mutate(fields);
    }

    history.push(ROUTES.PROJECTS);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFields((fields) => ({
      ...fields,
      [name]: value,
    }));
  };

  if (editing && !editableProject) {
    return <Loading />;
  }

  const currentClient = clients?.find((client) => client.id === editableProject?.client);

  if (editing && !currentClient) {
    return <Loading />;
  }

  const action = editing ? "Edit" : "Add";

  return (
    <article>
      <div className="page__actions">
        <Breadcrumbs>
          <Breadcrumb title="Dashboard" link={ROUTES.DASHBOARD} />
          <Breadcrumb title="Projects" link={ROUTES.PROJECTS} />
          {id && <Breadcrumb title={currentClient.company} link={`${ROUTES.CLIENTS}/${currentClient.id}`} />}
          <Breadcrumb title={action} active />
        </Breadcrumbs>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <label className="form__label">
          Client
          <select
            name="client"
            className="form__input form__input--select"
            onChange={handleInputChange}
            value={editableProject?.client}
            required
          >
            {!editableProject && <option value="">Select a client...</option>}
            {clients?.map((client) => (
              <option key={client.id} value={client.id}>
                {client.company}
              </option>
            ))}
          </select>
        </label>

        <label className="form__label">
          Stage
          <select
            name="stage"
            className="form__input form__input--select"
            onChange={handleInputChange}
            value={fields.stage}
            required
          >
            {!fields.stage && <option value="">Select a stage...</option>}
            {stages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </label>

        <label className="form__label">
          Status
          <select
            name="status"
            className="form__input form__input--select"
            onChange={handleInputChange}
            value={fields.status}
            required
          >
            {!fields.status && <option value="">Select a status...</option>}
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="form__label">
          Type
          <select
            name="type"
            className="form__input form__input--select"
            onChange={handleInputChange}
            value={fields.type}
            required
          >
            {!fields.type && <option value="">Select a type...</option>}
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="form__label">
          Notes
          <input className="form__input" name="notes" type="text" value={fields.notes} onChange={handleInputChange} />
        </label>

        <label className="form__label">
          Next Action
          <input
            className="form__input"
            name="action"
            type="date"
            value={fields.action}
            onChange={handleInputChange}
            required
          />
        </label>

        <button className="form__submit button" type="submit">
          {action} Project
        </button>
      </form>
    </article>
  );
};

export default ProjectActions;