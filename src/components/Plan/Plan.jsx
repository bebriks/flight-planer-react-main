import React, { useState, useEffect } from 'react';
import '../Plan/Plan.css'
import minus from '../../assets/Decrease.png'



const PlanItem = ({index, heading, speed, altitude}) => {

    const [showComponent, setShowComponent] = useState(true);
    useEffect(() => {
        return () => {
            
        };
    }, []);

    const handleClick = async () => {
        try {
            const response = await fetch(`https://localhost:7110/api/launch/stages/${index}`, {
                method: 'DELETE'
            });

            if (response.ok) { 
                // Если запрос был успешным, прячем компонент
                setShowComponent(false);
            } else {
                // Обрабатываем ошибку, если удаление не удалось
                console.error('Failed to delete the plan item with id:', index);
            }
        } catch (error) {
            // Обрабатываем ошибку сети или ошибку, когда сервер не ответил
            console.error('Network or server error when attempting to delete plan item:', error);
        }
    };
    return (
        <>
        {   showComponent &&
            <div className="added-flight" id={index}>
                <tr className="table-element">
                    <td className="table-element-item table-element-item-1">{index}</td>
                    <td className="table-element-item table-element-item-2">{heading}</td>
                    <td className="table-element-item table-element-item-3 table-speed">{speed}</td>
                    <td className="table-element-item table-element-item-4">{altitude}</td>
                    <td>
                        {showComponent && <button className="minus" type='button' onClick={() => handleClick() }><img src={minus}/></button>}
                    </td>
                </tr>
            </div>
        }
        </>
    )
}

export default PlanItem;