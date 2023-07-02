import React, {useEffect} from "react";
import { Expense } from "../../types";
import { Button, Card, Col, Row, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {deleteExpenseById} from "../../services/expense-services";

const ExpenseCard = ( expense:Expense ) => {
    useEffect(() => {
    }, [expense]);
    return (
        <Card title={expense.title} bordered={false}>
            <p>{expense.description}</p>
            <h3>{expense.category}</h3>
            <h4>{expense.amount} LKR</h4>
            {/*<span>{expense.date.getDate()}</span>*/}
            <Row>
                <Col md={4}>
                    <Tooltip title="Delete">
                        <Button onClick={()=> {
                            deleteExpenseById(expense.id);
                            window.location.reload();
                        }} type="primary" shape="circle" icon={<DeleteOutlined />} />
                    </Tooltip>
                </Col>
                <Col md={4}>
                    <Tooltip title="Edit">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} />
                    </Tooltip>
                </Col>
            </Row>
        </Card>
    );
}

export default ExpenseCard;
