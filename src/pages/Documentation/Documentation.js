import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { DocumentationContext } from "../../context/DocumentationContext";

import useTitle from "../../hooks/useTitle";

import { ROUTES } from "../../constants/constants";

import Document from "../../components/documentation/Document/Document";
import List from "../../components/List/List";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb/Breadcrumb";

const title = "Tracker • Documentation";

const Documentation = () => {
  useTitle(title);

  const { loading, error, documentation } = useContext(DocumentationContext);

  return (
    <>
      <Breadcrumbs>
        <Breadcrumb title="Dashboard" link={ROUTES.DASHBOARD} />
        <Breadcrumb title="Documentation" active />
      </Breadcrumbs>

      <Link className="button" to={`${ROUTES.DOCUMENTATION}/add`}>
        Add Document
      </Link>

      <List loading={loading} error={error} items={documentation} item={Document} />
    </>
  );
};

export default Documentation;
