import React, {useEffect, useState} from 'react';
import './App.css';
import {Card, List, notification, Spin} from "antd";
import { Expense } from "./types";
import axios, {AxiosResponse} from "axios";
import {API_URL} from "./constants";

function App() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getExpenses = async () => {
        axios.get(
                `${API_URL}expense/`
            ).then((result: AxiosResponse<Expense[]>) => {
                if (result.status === 200 || result.status === 204) {
                    setExpenses(result.data)
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    throw new Error();
                }
            }).catch(() => {
                setIsLoading(false);
                notification.error({
                    message: 'Warning!',
                    description: 'Something went wrong when fetching expenses'
                });
        })
    }

    useEffect(() => {
        setIsLoading(true) ;
        getExpenses();
    }, []);

    return (
    <div className="App">
        <Spin tip="Loading..." spinning={isLoading}>
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={expenses}
            renderItem={(item) => (
                <List.Item>
                    <Card title={item.title}>{item.description}</Card>
                </List.Item>
            )}
        />
        </Spin>
    </div>
    );
}

export default App;
