import CardElem from "@/components/cards/Card";
import Layout from "@/layouts/layout";

export default function Home() {
  return (
    <Layout>
      <div className="d-flex gap-4 justify-content-evenly flex-wrap">
        {/* <CardElem buttonLabel="My Dashboard" buttonLink="/mydashboard" /> */}
        <CardElem buttonLabel="Add User" buttonLink="/adduser" />
        <CardElem buttonLabel="Add Department" buttonLink="/adddepartment" />
        {/* <CardElem
          buttonLabel="Add Department Head"
          buttonLink="/adddepartmenthead"
        /> */}
      </div>
    </Layout>
  );
}
