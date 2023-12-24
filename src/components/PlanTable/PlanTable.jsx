import React, {useState, useEffect} from "react";
import PlanItem from "../Plan/Plan";
import plus from '../../assets/Union.png'
import './PlanTable.css';


const MainApp = () => {
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    fetchPlanData(); // Загружаем данные при инициализации компонента
  }, []);

  const getData = (form) => {
    const dataForm = new FormData(form);
    const data = {};
    for (let [name, value] of dataForm){
      data[name] = value;
    }
    return data;
  }

  const clearForm = () => {
    const form = document.getElementById('form');

    form.querySelector('.heading').value = '';
    form.querySelector('.speed').value = '';
    form.querySelector('.altitude').value = '';
  }

  const handlerAddPlan = async (formData) => {
    // Validate formData before proceeding
    if (!formData.heading || !formData.speed || !formData.altitude) { return; }

    // Construct new plan item
    const newPlan = { index: plan.length, ...formData };

    // Update the state and log the plan items
    setPlan((prevPlan) => {
      const updatedPlan = [...prevPlan, newPlan];
      logPlanItemData(updatedPlan); // Log the updated plan items
      return updatedPlan;
    });
    try {
      // Asynchronously send new plan to server
      const response = await sendDataToServer(newPlan);
      // Here you might want to do something with the response
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error('There was an error sending the data to the server:', error);
    }
  };

  const logPlanItemData = (updatedPlan) => {
    console.log(updatedPlan);
  };
  const sendDataToServer = async (data) => {
    const serverUrl = "https://localhost:7110/api/launch/stages";
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };
  const fetchPlanData = async () => {
    try {
      const serverUrl = "https://localhost:7110/api/launch/stages";
      const response = await fetch(serverUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPlan(data); // Обновляем состояние плана данными с сервера
    } catch (error) {
      console.error('There was an error fetching the data:', error);
    }
  };
  return (
    <>
      <header className="App-header">
      <h1>Make Your Flight Simulation</h1>
        <form class="add-stage" id="form" method='POST' enctype="application/json"> 
          <div class="add-stage-element add-stage-element-1">
            <p class="course-label">Course:</p>
            <input type="text" class="course" name="heading" required/>
          </div>
          <div class="add-stage-element add-stage-element-2">
            <p class="speed-label">Indicated Air Speed (m/s):</p>
            <input type="number" class="speed" step="0.01" name="speed" required/>
          </div>
          <div class="add-stage-element add-stage-element-3">
            <p class="altitude-label">True Altitude:</p>
            <input type="number" class="altitude" name="altitude" required/>
          </div>
          <div class="add-stage-element add-stage-element-4">
            <button onClick={e => {e.preventDefault(); const formData = getData(document.getElementById('form')); handlerAddPlan(formData);}} type="submit" class="plus"><img src={plus}/></button>
          </div>
        </form>
    </header>
    <main class="main-info">
      <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d69934.32592146858!2d60.723338649999995!3d56.78678595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1700587609013!5m2!1sru!2sru" width="623" height="604" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      <div class="info-table">
        <table class="table">
          <thead>
            <div class="table-head">
              <h2>Flight Plan Stages</h2>
              <div class="table-head-info">
                <tr class="table-element">
                  <th class="table-element-info table-element-info-1">#</th>
                  <th class="table-element-info table-element-info-2">Course</th>
                  <th class="table-element-info table-element-info-3 table-speed">Indicated Air Speed</th>
                  <th class="table-element-info table-element-info-4">TrueAltitude</th>
                </tr>
              </div>
            </div>
          </thead>
          <tbody>
            <div class='scroll'>
            {plan && plan.map(element => 
              <PlanItem
                key={element.id} 
                index={element.index}
                heading={element.heading}
                speed={element.speed}
                altitude={element.altitude}
              />
            )} 
            </div>
          </tbody>
        </table>
      </div>
    </main>     
    </>
  ) 
}

export default MainApp;