import type { FC } from 'react'
import {Card, Space, Typography, Descriptions, Empty, Select} from "antd"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {getAllUsers, postUser, UserWithTimestamp} from "../queries";
import {Form, Button, message, Input, DatePicker} from "antd";


const {Title} = Typography

const CreateUser: FC = () => {

    const queryClient = useQueryClient()
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()

    const createUserMutation = useMutation({
        mutationFn: postUser(),
        onSuccess: () => {
            messageApi.open({
                type: 'success',
                content: 'Пользователь создан',
            });
            queryClient.invalidateQueries({queryKey: ['users']})
        },
        onError: () => {
            messageApi.open({
                type: 'error',
                content: 'Произошла ошибка',
            });
        }
    })

    const onSubmit = (fieldsValue: any) => {
        const values = {
            ...fieldsValue,
            birthday: fieldsValue['birthday'].format('YYYY-MM-DD'),
        }
        console.log(JSON.stringify(values));
        createUserMutation.mutate(values);
    }

    return (
        <Card style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%'}}>
            {contextHolder}
            <Title level={5} style={{marginBottom: '2em', textAlign: 'center'}}>Создать пользователя</Title>

            <Form
                layout='horizontal'
                form={form}
                initialValues={{ layout: 'vertical' }}
                style={{ maxWidth: 600 }}
                onFinish={onSubmit}
            >
                <Form.Item
                    name='username'
                    label="Username"
                    rules={[
                        {required: true, message: 'Пожалуйста введите username'}
                    ]}>
                    <Input placeholder="ivanovich" />
                </Form.Item>

                <Form.Item
                    name='name'
                    label="ФИО"
                    rules={[
                        {required: true, message: 'Пожалуйста введите ФИО'}
                    ]}>
                    <Input placeholder="Иванов Иван Иванович" />
                </Form.Item>

                <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                        {required: true, message: 'Пожалуйста введите Email'},
                        {type: 'email', message: 'Некорректный email'}
                    ]}>
                    <Input placeholder="input placeholder" />
                </Form.Item>

                <Form.Item
                    label='День рождения'
                    name='birthday'
                    rules={[
                        {required: true, message: 'Пожалуйста введите день рождения'}
                    ]}>
                    <DatePicker/>
                </Form.Item>

                <Form.Item
                    label='Пол'
                    name='gender'
                    rules={[
                        {required: true, message: 'Пожалуйста укажите пол'}
                    ]}>
                    <Select
                        showSearch
                        placeholder="Выберите пол..."
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                            {
                                value: 'male',
                                label: 'Мужской',
                            },
                            {
                                value: 'female',
                                label: 'Женский',
                            },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label='Суперсила'
                    name='superpower'
                    rules={[
                        {required: true, message: 'Пожалуйста укажите суперсилу'}
                    ]}>
                    <Select
                        showSearch
                        placeholder="Выберите суперсилу..."
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                            {
                                value: 'immortality',
                                label: 'Бессмертие',
                            },
                            {
                                value: 'levitation',
                                label: 'Левитация',
                            },
                            {
                                value: 'noclipping',
                                label: 'Прохождение сквозь стены',
                            },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    name='biography'
                    label="Биография"
                >
                    <Input.TextArea rows={4} maxLength={256} placeholder="Я родился..." />
                </Form.Item>

                <Form.Item style={{textAlign: 'center'}} >
                    <Button type="primary" color='success' size='large' htmlType='submit'>Создать</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

const MapGenderName = {
    'male': 'Мужской',
    'female': 'Женский'
}

const MapSuperpowerName = {
    "immortality": 'Бессмертие',
    "levitation": 'Левитация',
    "noclipping": 'Прохождение сквозь стены'
}

export default CreateUser
