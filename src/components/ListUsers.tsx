import type { FC } from 'react'
import {Card, Space, Typography, Descriptions, Empty} from "antd"
import {useQuery} from "@tanstack/react-query";
import {getAllUsers, UserWithTimestamp} from "../queries";


const {Title} = Typography

const ListUsers: FC = () => {

    const {isLoading, isError, data} = useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers(),
    });

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%'}}>

            <Title level={5} style={{marginBottom: '2em', textAlign: 'center'}}>Список пользователей</Title>

            <Space direction='vertical' size='middle' className='overflow-y-scroll hide-scrollbar'>
                {isLoading || isError
                    ? <Empty description='Грузимся...'/> :
                    data?.length == 0
                    ? <Empty description='Тут пока пусто - создайте пользователя :)'/>
                    : data?.map(user =>
                        <Card rootClassName='scale-on-hover' title={user.name} size='small' bordered={true} key={user.username}>
                            <Descriptions size='small' column={1}>
                                <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
                                <Descriptions.Item label="Создано">{user.created_at}</Descriptions.Item>
                                <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                                <Descriptions.Item label="День рождения">{user.birthday}</Descriptions.Item>
                                <Descriptions.Item label="Пол">{MapGenderName[user.gender]}</Descriptions.Item>
                                <Descriptions.Item label="Суперсила">{MapSuperpowerName[user.superpower]}</Descriptions.Item>
                                <Descriptions.Item label="Биография">{user.biography || 'Не указано'}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    )
                }
            </Space>
        </div>
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

export default ListUsers
