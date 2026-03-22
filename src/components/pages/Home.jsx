import Header from "../layout/Header";
import DriverInfo from "../common/DriverInfo";
import Safety from "./Safety";
import Contact from "./Contact";

export default function Home() {
  return (
    <>
      <Header />
      <DriverInfo />
      <Safety />
      <Contact />
    </>
  );
}
