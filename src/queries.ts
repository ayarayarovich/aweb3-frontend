
export interface User {
    username: string
    name: string
    email: string
    birthday: string
    gender: 'male' | 'female'
    superpower: 'immortality' | 'levitation' | 'noclipping',
    biography: string
}

export interface UserWithTimestamp extends User {
    created_at: string
}

export const getAllUsers = () => {
    return (): Promise<UserWithTimestamp[]> => {
        return fetch(`http://u52831.kubsu-dev.ru/aweb3/api/user.php`)
            .then(res => res.json())
    }
}

export const getUser = (username: string) => {
    return (): Promise<UserWithTimestamp> => {
        return fetch(`http://u52831.kubsu-dev.ru/aweb3/api/user.php?username=${username}`)
            .then(res => res.json())
    }
}

export const postUser = () => {
    return (user: User) => {
        return fetch(`http://u52831.kubsu-dev.ru/aweb3/api/user.php`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
    }
}


