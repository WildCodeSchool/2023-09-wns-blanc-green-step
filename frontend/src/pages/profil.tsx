import { Button } from "@/components/Button";
import { AuthContext } from "@/contexts/AuthContext";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const UPDATE_USER = gql`
    mutation UpdateUser($username: String!, $email: String!, $updateUserId: Float!) {
        updateUser(username: $username, email: $email, id: $updateUserId) {
        username
        email
        id
        image
        }
    }
`

const UPDATE_USER_PASSWORD = gql`
    mutation UpdateUserPassword($password: String!, $updateUserPasswordId: Float!) {
        updateUserPassword(password: $password, id: $updateUserPasswordId) {
        id
        }
    }
`

export default function Profil() {
    const { user } = useContext(AuthContext);
    const [newIdentifiant, setNewIdentifiant] = useState<string>(user.username);
    const [newEmail, setNewEmail] = useState<string>(user.email);
    const [newPassword, setNewPassword] = useState<string>("");

    const [updateUserRequest] = useMutation(UPDATE_USER);
    const [updateUserPasswordRequest] = useMutation(UPDATE_USER_PASSWORD);

    const updateUser = async () => {
        updateUserRequest({
            variables: {
                updateUserId: Number(user.id),
                email: String(newEmail),
                username: String(newIdentifiant),
            }
        })
    }

    const updateUserPassword = async () => {
        updateUserPasswordRequest({
            variables: {
                updateUserPasswordId: Number(user.id),
                password: String(newPassword),
            }
        })
    }

    return (
        <>
            <h1 className="mx-auto mt-4 font-bold italic text-xl sm:text-4xl text-center mb-12 relative sm:w-fit after:absolute after:w-full after:inset-x-0 after:bottom-[-8px] after:scale-x-105 sm:after:bottom-[-5px] after:h-5 after:bg-secondary-10 z-[1] after:z-[-1]">
                Mon profil
            </h1>

            <Tabs className="w-[60%] relative mx-auto">
                <TabList className="flex items-center justify-around">
                    <Tab className="w-[50%] text-center">Informations personnelles</Tab>
                    <Tab className="w-[50%] text-center">Mot de passe</Tab>
                </TabList>

                <TabPanel>
                    <div className="flex flex-col items-center justify-center mt-10">
                        <div className="flex flex-col items-center justify-center mb-14">
                            <img src="/images/blank-avatar.png" alt="" className="rounded-full" />
                            <p>Éditer mon avatar</p>
                        </div>

                        <div className="w-[40%] flex flex-col mb-8">
                            <label htmlFor="">Identifiant</label>
                            <input
                                className="border-none my-2 p-2 pl-4 rounded-3xl bg-gray-80"
                                value={newIdentifiant}
                                onChange={(e) => setNewIdentifiant(e.target.value)}
                            />
                        </div>

                        <div className="w-[40%] flex flex-col mb-8">
                            <label htmlFor="">Email</label>
                            <input
                                className="border-none my-2 p-2 pl-4 rounded-3xl bg-gray-80"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                        </div>

                        <Button
                            content="Sauvegarder"
                            color="bg-blue-80"
                            textsize="text-md"
                            onClick={() => updateUser()}
                        />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="flex flex-col items-center justify-center mt-10">
                        <div className="w-[40%] flex flex-col mb-8">
                            <label>Nouveau mot de passe</label>
                            <input type="password"
                                className="border-none my-2 p-2 pl-4 rounded-3xl bg-gray-80"
                                onChange={(e) => { setNewPassword(e.target.value) }}
                            />
                        </div>

                        <div className="w-[40%] flex flex-col mb-8">
                            <label htmlFor="">Confirmer le nouveau mot de passe</label>
                            <input type="password"
                                className="border-none my-2 p-2 pl-4 rounded-3xl bg-gray-80"
                            />
                        </div>

                        <Button
                            content="Sauvegarder"
                            color="bg-blue-80"
                            textsize="text-md"
                            onClick={(e) => updateUserPassword()}
                        />
                    </div>
                </TabPanel>
            </Tabs>
        </>
    )
}