import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold pt-4">Wellcome to our authentication site</h2>
      <h2 className=" pt-12">Please <Link to="/registration">Registration</Link> on this site and must verify your email to connect with us </h2>
    </div>
  )
}

export default Home
