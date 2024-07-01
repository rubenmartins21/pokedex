import React from "react";
import Layout from "../../components/Layout/Layout";
import { useTranslation } from "react-i18next";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <h1>HomePage</h1>
      <h2>{t("homePage.hello")}</h2>
    </Layout>
  );
};

export default HomePage;
