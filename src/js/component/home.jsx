import React, { useState, useEffect } from "react";

//include images into your bundle
//create your first component
const Home = () => {
	const [tarea, setTarea] = useState("");
	const [tareas, setTareas] = useState([
		{
			done: false,
			label: tareas,
		},
	]);
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/evadneo")
			.then((response) => response.json())
			.then((result) => setTareas(result))
			.catch((error) => console.log("error", error));
	}, []);

	const lista = (hola) => {
		hola.preventDefault();
		setTareas([...tareas, { label: tarea }]);

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(tareas);

		var requestOptions = {
			url: "https://assets.breatheco.de/apis/fake/todos/user/evadneo",
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(requestOptions)
			.then((response) => response.json())
			.then((result) => setTareas(result))
			.catch((error) => console.log("error", error));
	};

	const eliminar = (key) => {
		setTareas(tareas.filter((item, index) => index !== key));
		console.log(key);
	};

	return (
		<div className="container mt-5">
			<h1 className="text-center">TAREAS</h1>
			<div className="row">
				<div className="col-10">
					<form onSubmit={lista}>
						<input
							type="text"
							className="form-control mb-2"
							placeholder="Ingrese Tarea"
							onChange={(e) => setTarea(e.target.value)}
							value={tarea}
						/>
						<ul className="list-group">
							{tareas.map((li, key) => (
								<li className="list-group-item" key={key}>
									{li.label}

									<div
										className="close"
										onClick={() => eliminar(key)}>
										<button
											type="button"
											class="btn btn-dark">
											Eliminar
										</button>
									</div>
								</li>
							))}
						</ul>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Home;
