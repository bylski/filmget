import { useSession } from "next-auth/react";
import React from "react";
import styles from "./styles/Settings.module.scss";
import Setting from "./Setting";
import { Session } from "next-auth";

const Settings: React.FC<{ sessionData: Session | null }> = (props) => {
  const session = useSession();

  return (
    <main className={styles["settings-section"]}>
      <header className={styles["header"]}>
        <h1 className={styles["header__text"]}>Account Settings</h1>
      </header>
      <div className={styles["settings"]}>
        <div className={styles["first-column"]}>
          <Setting
            sessionData={props.sessionData}
            type="inputs"
            headerText={"Change Username"}
            apiAddress={"/api/change-username"}
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
            sessionData={props.sessionData}
            type="inputs"
            headerText={"Change Password"}
            apiAddress={"/api/change-password"}
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
        </div>
        <div className={styles["second-column"]}>
          <Setting
            sessionData={props.sessionData}
            headerText="Pick Profile Picture"
            type="avatarChange"
          ></Setting>
          {/* <StyledButton addClass={styles["setting__btn"]}>Upload</StyledButton> */}
        </div>
      </div>
    </main>
  );
};

export default Settings;
