import React, {useEffect, useState} from 'react';
import './App.css';
import {Card, List, Spin} from "antd";
import { Expense } from "./types";
import { getExpenses } from "./services/expense-services";

function App() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        // setExpenses();
    }, []);

    return (
    <div className="App">
        <Spin tip="Loading..." spinning={isLoading}>
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={expenses}
            renderItem={(item) => (
                <List.Item>
                    <Card title={item.title}>Card content</Card>
                </List.Item>
            )}
        />
        </Spin>
    </div>
    );
}

export default App;
