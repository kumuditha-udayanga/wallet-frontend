import React, {useEffect, useState} from 'react';
import './App.css';
import {Button, Form, Input, List, Modal, notification, Spin} from "antd";
import { Expense } from "./types";
import axios, { AxiosResponse } from "axios";
import { API_URL } from "./constants";
import ExpenseCard from "./components/card/expenseCard";
import {createExpense} from "./services/expense-services";

function App() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);

    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [category, setCategory] = useState<string>();
    const [amount, setAmount] = useState<number>();

    const showModal = () => {
        setIsModalActive(true);
    }

    const handleSubmit = (values: any) => {
        setIsModalActive(false);
        const data = {
            title: title,
            description: description,
            category: category,
            amount: amount
        }
        // createExpense(data);
    };

    const handleClose = () => {
        setIsModalActive(false);
    };


     const getExpenses = async () => {
        axios.get(
                `${API_URL}/expense/`
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
        <Button onClick={showModal} className="createExpenseButton" type="primary">Create Expense</Button>
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={expenses}
            renderItem={(item) => (
                <List.Item>
                    <ExpenseCard id={item.id} title={item.title} description={item.description} category={item.category} amount={item.amount} date={item.date} />
                </List.Item>
            )}
        />
        <Modal
            title="Title"
            open={isModalActive}
            onOk={handleSubmit}
            onCancel={handleClose}
        >
            <Form
                id="create-element-form"
                onFinish={handleSubmit}
                layout="vertical"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter a title' }]}
                >
                    <Input onChange={(event)=> {setTitle(event.target.value)}}/>
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea onChange={(event)=> {setDescription(event.target.value)}} />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="category"
                >
                    <Input.TextArea onChange={(event)=> {setCategory(event.target.value)}} />
                </Form.Item>
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{ required: true}]}
                >
                    <Input type="number" onChange={(event)=> {setAmount(parseInt(event.target.value))}} />
                </Form.Item>
            </Form>
        </Modal>
        </Spin>
    </div>
    );
}

export default App;
