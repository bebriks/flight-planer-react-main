import React, { useState, useEffect } from 'react';
import '../Plan/Plan.css';
import minus from '../../assets/Decrease.png';



const PlanItem = (props) => {
    const [showComponent, setShowComponent] = useState(true);

    useEffect(() => {
        return () => {

        };
    }, {});

    const handleClick = async () => {
        try {
            const response = await fetch(`https://localhost:7110/api/launch/stages/${props.index}`, {
                method: 'DELETE'
            });

            if (response.ok) { 
                setShowComponent(false);
                props.onRemoveData();
            } else {
                // Обрабатываем ошибку, если удаление не удалось
                console.error('Failed to delete the plan item with id:', props.id);
            }
            props.onRemoveData();
        } catch (error) {
            // Обрабатываем ошибку сети или ошибку, когда сервер не ответил
            console.error('Network or server error when attempting to delete plan item:', error);
        }
    };

    return (
        <>
        {   showComponent &&
            <div className="added-flight" id={props.id}>
                <tr className="table-element">
                    <td className="table-element-item table-element-item-2">{props.heading}</td>
                    <td className="table-element-item table-element-item-3 table-speed">{props.speed}</td>
                    <td className="table-element-item table-element-item-4">{props.altitude}</td>
                    <td>
                        {showComponent && <button className="minus" type='button' onClick={() =>{handleClick();}}><img src={minus}/></button>}
                    </td>
                </tr>
            </div>
        }
        </>
    )
}

export default PlanItem;