
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import UserContext from "../../context/UserContext";
import { useContext, useState } from "react";

const ProposalForm = () => {
  const { user } = useContext(UserContext);
  const userId = user?._id;
  const user_name = user?.firstName + " " + user?.lastName;
  const { id } = useParams();
  console.log('jobbb:',id)
  
  
//post para proposals
  const createProposal = async (values) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/job/${id}/proposal`,
        {
          ...values,
          job: id,
          userId: userId,
          user_name: user_name
        },
        { withCredentials: true }
      );
      console.log('id:',userId)
      console.log('response:',response.data);
      Swal.fire({
        icon: "success",
        title: "Propuesta enviada!",
        text: "Tu propuesta ha sido enviada!",
      });
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <Formik
      initialValues={{
        description: "",
      }}
      onSubmit={(values) => {
        createProposal(values);
      }}
    >
      <Form className="container mt-3 border pt-3 shadow-sm mb-5 pb-3">
        <h3 className="text-center">Enviar propuesta</h3>
        <div className="form-group">
        <Field type="hidden" name="userId" value={userId} />
        <Field type="hidden" name="jobId" value={id} />
          <label htmlFor="description">Descripción</label>
          <Field
            type="text"
            className="form-control"
            id="description"
            name="description"
            component="textarea"
          />
          <ErrorMessage
            name="description"
            component="div"
            className="alert alert-danger"
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Telefono</label>
          <Field
            type="number"
            className="form-control"
            id="telefono"
            name="telefono"
          />
          <ErrorMessage
            name="telefono"
            component="div"
            className="alert alert-danger"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Field
            type="email"
            className="form-control"
            id="email"
            name="email"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="alert alert-danger"
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Enviar propuesta
        </button>
      </Form>
    </Formik>
  );
};

export default ProposalForm;

