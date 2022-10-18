import React, {useEffect, useState} from 'react';
import "./Workers.css";
import {UsersService} from "../../api/API";
import {IUser} from "../../types/authTypes";
import {observer} from "mobx-react-lite";

const Workers = () => {

    const [users, setUsers] = useState<IUser[]>([]);
    const [error, setError] = useState<string>("");

    const getAllUsers = () => {
        try {
            UsersService.getUsers().then((result) => setUsers(result.data));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    const handleDelete = (email: string) => {
        UsersService.deleteUser(email).then(() => {
            getAllUsers();
        });
    };

    return (
        <div className="workers-container">
            <div className="bg-dark text-white workers-box">
                <div className="worker-row">
                    <div className="worker-item justify-content-center">Имя</div>
                    <div className="worker-item justify-content-center">Почта</div>
                </div>
            </div>
            {users.length !== 0 && users.map(user => {
                return <div key={user.email} className="bg-dark text-white workers-box">
                    <div className="worker-row">
                        <div className="worker-item">{user.name}</div>
                        <div className="worker-item">{user.email}</div>
                        <button className={"delete-button"} onClick={() => handleDelete(user.email)}>X</button>
                    </div>
                </div>
            })}
        </div>
    );
};

export default observer(Workers);