import { useSession } from "next-auth/react";
import React from "react";
import styles from "../styles/Settings.module.scss";
import Setting from "./Setting";
import Image from "next/image";

const Settings: React.FC<{}> = (props) => {
  const session = useSession();

  return (
    <main className={styles["settings-section"]}>
      <header className={styles["header"]}>
        <h1 className={styles["header__text"]}>Account Settings</h1>
      </header>
      <div className={styles["settings"]}>
        <form className={styles["form"]}>
          <Setting
            type="inputs"
            headerText={"Change Username"}
            inputs={[
              {
                label: "New Username",
                type: "text",
                id: "newUsername",
                placeholder: "Username",
              },
            ]}
          />
          <Setting
            type="inputs"
            headerText={"Change password"}
            inputs={[
              {
                label: "Current Password",
                type: "password",
                id: "currentPassword",
                placeholder: "*********",
              },
              {
                label: "New Password",
                type: "password",
                id: "newPassword",
                placeholder: "*********",
              },
            ]}
          />
        </form>
        <div className={styles["second-column"]}>
          <Setting headerText="Pick Avatar" type="avatarChange"></Setting>
        </div>
      </div>
    </main>
  );
};

export default Settings;
