import Head from "next/head";
import ReactNotificationsComponent from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

const Layout = props => (
  <div>
    <ReactNotificationsComponent/>
    <Head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/css/uikit.min.css"
        integrity="sha256-5YtK9j+Nl/245lAkSjrIs600d6edKTevi+3JYdjuHhY="
        crossorigin="anonymous"
      />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lexend+Deca:400italic,400,300,700"/>
    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css?family=Oswald&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css?family=Lora&display=swap" rel="stylesheet"/>
    <script src="https://js.stripe.com/v3/"></script>
    <link rel="stylesheet" href="/assets/css/extra.css"/>
      <script
        src="https://kit.fontawesome.com/514a61b63d.js"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js"
        integrity="sha256-A7WGGnbT0f0OYHWQVkWqX6GQdZHZDi8IsbD/u+FQaVc="
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit-icons.min.js"
        integrity="sha256-p2Y38iAB/pU4dGRY5eWPrWcPR4XwRDtQqxO9yoFTtF0="
        crossorigin="anonymous"
      ></script>
      <title>{props.title} | Balert</title>
    </Head>
    {props.children}
  </div>
);

export default Layout;
