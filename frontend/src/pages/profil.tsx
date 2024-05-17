import { Button } from "@/components/Button";
import { PictureUpload } from "@/components/PictureUpload";
import { AuthContext } from "@/contexts/AuthContext";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const UPDATE_USER = gql`
mutation UpdateUser($username: String!, $email: String!, $updateUserId: Float!, $image: String!) {
    updateUser(username: $username, email: $email, id: $updateUserId, image: $image) {
      id
      email
      image
      username
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
    const { user, setUser } = useContext(AuthContext);
    const [newIdentifiant, setNewIdentifiant] = useState<string>("");
    const [newEmail, setNewEmail] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [imgUrl, setImgUrl] = useState<string>("");

    const [updateUserRequest] = useMutation(UPDATE_USER);
    const [updateUserPasswordRequest] = useMutation(UPDATE_USER_PASSWORD);

    const updateUser = async () => {
        updateUserRequest({
            variables: {
                updateUserId: Number(user.id),
                email: String(newEmail),
                username: String(newIdentifiant),
                image: String(imgUrl),
            },
            onCompleted: (data) => {
                setUser({ id: user.id, username: newIdentifiant, email: newEmail, image: imgUrl })
            },
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

    useEffect(() => {
        setNewEmail(user.email);
        setNewIdentifiant(user.username);
        setImgUrl(user.image);
    }, [user])

    return (
        <>
            <h1 className="mx-auto mt-4 font-bold italic text-xl sm:text-4xl text-center mb-12 relative sm:w-fit after:absolute after:w-full after:inset-x-0 after:bottom-[-8px] after:scale-x-105 sm:after:bottom-[-5px] after:h-5 after:bg-secondary-10 z-[1] after:z-[-1]">
                Mon profil
            </h1>

            <Tabs className="w-[60%] relative mx-auto">
                <TabList className="flex items-center justify-around">
                    <Tab className="w-[50%] h-14 text-center border-b border-grey-30 p-2" selectedClassName="border-blue-40">Informations personnelles</Tab>
                    <Tab className="w-[50%] h-14 text-center border-b border-grey-30 p-2" selectedClassName="border-blue-40">Mot de passe</Tab>
                </TabList>

                <TabPanel>
                    <div className="flex flex-col items-center justify-center mt-10">
                        <div className="flex flex-col items-center justify-center mb-14">
                            <PictureUpload imgUrl={imgUrl} setImgUrl={setImgUrl} />
                        </div>

                        <div className="w-[80%] flex flex-col mb-8 md:w-[40%]">
                            <label htmlFor="">Identifiant</label>
                            <input
                                data-test-id="username"
                                className="border-none my-2 p-2 pl-4 rounded-3xl bg-gray-80"
                                value={newIdentifiant}
                                onChange={(e) => e.target.value !== "" ? setNewIdentifiant(e.target.value) : user.username}
                            />
                        </div>

                        <div className="w-[80%] flex flex-col mb-8 md:w-[40%]">
                            <label htmlFor="">Email</label>
                            <input
                                data-test-id="email"
                                className="border-none my-2 p-2 pl-4 rounded-3xl bg-gray-80"
                                value={newEmail}
                                onChange={(e) => e.target.value !== "" ? setNewEmail(e.target.value) : user.email}
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
                        <div className="w-[80%] flex flex-col mb-8 md:w-[40%]">
                            <label>Nouveau mot de passe</label>
                            <input type="password"
                                className="border-none my-2 p-2 pl-4 rounded-3xl bg-gray-80"
                                onChange={(e) => { setNewPassword(e.target.value) }}
                            />
                        </div>

                        <div className="w-[80%] flex flex-col mb-8 md:w-[40%]">
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