import React, { useState, useEffect } from "react";

//include images into your bundle
//create your first component
const Home = () => {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);

  //GET
  const getTareas = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/evadneo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => setTareas(data));
  };

  useEffect(() => {
    getTareas();
  }, []);

  //PUT
  const lista = (newTarea) => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/evadneo", {
      method: "PUT",
      body: JSON.stringify(newTarea),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  //POST y DELETE

  const deleteTareas = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/evadneolivo", {
      method: "DELETE",
      body: raw,
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      fetch("https://assets.breatheco.de/apis/fake/todos/user/evadneolivo", {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
  };

  const inputHandler = (e) => {
    //Handler que ejecuta acción si se presiona enter//
    if (e.key === "Enter" && e.target.value !== "") {
      let newLista = { label: e.target.value, done: false };
      setTareas(
        tareas.concat({ label: `${e.target.value}`, done: false }),
        lista([...tareas, newLista])
      );
      e.target.value = "";
    }
  };

  const handleClick = (i) => {
    setTareas(tareas.filter((item) => item !== tareas[i]));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">TAREAS</h1>
      <div className="row">
        <div className="col-10">
          <form>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Tarea"
              value={tarea}
              onKeyDown={(e) => inputHandler(e)}
              onChange={(e) => {
                setTarea(e.target.value);
              }}
            />
            <ul className="list-group">
              {tareas.map((task, i) => {
                return (
                  <li className="list-group-item ocultate" key={i}>
                    {task.label}
                    <span id={i} className="displayed">
                      <button
                        type="button"
                        class="btn btn-dark"
                        onClick={() => handleClick(i)}
                      >
                        Eliminar
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
