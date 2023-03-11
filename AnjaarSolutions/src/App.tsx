import React from "react";

import { Refine, GitHubBanner, AuthProvider } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  LightTheme,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";


//importing pages
import { Login } from "pages/login";
import AllCompanies from "pages/AllCompanies";
import AllLedgers from "pages/AllLedgers";
import CreateCompany from "pages/CreateCompany";
import CreateLedgers from "pages/CreateLedgers";
import EditCompany from "pages/EditCompany";
import EditLedgers from "pages/EditLedgers";


// importing logos
import { AccountBalanceSharp, BusinessSharp } from "@mui/icons-material";


import dataProvider from "@pankod/refine-simple-rest";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { Title, Sider, Layout, Header } from "components/layout";

import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";
import CompanyDetails from "pages/CompanyDetails";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthProvider = {
    //we are storing user both in local storage and MongoDB
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;
      

      //once logged in and we get the profile obj,we will save the user to MongoDB
      
      // first check if the user is logged in already
      if(profileObj){
        const response = await fetch('https://anjaar-solutions.onrender.com/api/v1/users',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar:profileObj.picture,
          })
        })
        const data = await response.json();
        //only set the user in localstorage if response status is 200 i.e successfull
        if(response.status === 200){

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id
            })
          );
        }
        else{
          //if response is not 200 means reject
          return Promise.reject();
        }
   
      }

     
      //setting user to local storage
      localStorage.setItem("token", `${credential}`);

      return Promise.resolve();
    },
    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  return (
    <>
  
      <ThemeProvider theme={LightTheme}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider("https://anjaar-solutions.onrender.com/api/v1")}
            notificationProvider={notificationProvider}
            ReadyPage={ReadyPage}
            catchAll={<ErrorComponent />}
            resources={[
              {
                name: "companies",
                list: AllCompanies,
                edit: EditCompany,
                show: CompanyDetails,
                create: CreateCompany,
                canDelete: true,
                icon:<BusinessSharp />
              },
              {
                name: "ledgers",
                list: AllLedgers,
                edit: EditLedgers,
                // show: MuiInferencer,
                create: CreateLedgers,
                canDelete: true,
                icon:<AccountBalanceSharp />
              },
            ]}
            Title={Title}
            Sider={Sider}
            Layout={Layout}
            Header={Header}
            routerProvider={routerProvider}
            authProvider={authProvider}
            LoginPage={Login}
          />
        </RefineSnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
