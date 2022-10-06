import React, {useEffect, useState} from 'react';
import {deleteUser, getUsers, IUsers} from "../../api/API";
import {dividerClasses} from "@mui/material";
import "./Workers.css";

const Workers = () => {

    const [users, setUsers] = useState<IUsers[]>([]);
    const [error, setError] = useState<string>("");

    const getAllUsers = async () => {
        const result = await getUsers();
        if (result.message) {
            setError(result.message);
        } else {
            setUsers(result);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    const handleDelete = async (id: string) => {
        await deleteUser(id);
    }

    return (
        <div className="d-flex justify-content-center">
            <div>
                <div className="bg-dark text-white workers-box">
                    <div className="worker-row">
                        <div className="worker-item justify-content-center">Имя</div>
                        <div className="worker-item justify-content-center">Почта</div>
                    </div>
                </div>
                {users.length !== 0 && users.map(user => {
                    return <div key={user._id} className="bg-dark text-white workers-box">
                        <div className="worker-row">
                            <div className="worker-item">{user.name}</div>
                            <div className="worker-item">{user.email}</div>
                            <button className={"delete-button"} onClick={() => handleDelete(user._id)}>X</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};

export default Workers;