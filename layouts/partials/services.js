import Link from "next/link";
import { IoTabletLandscapeOutline } from "react-icons/io5";

const Services = (props) => {
  return (
    <div className="post mb-6 rounded-3xl shadow shadow-green-500/50 transition duration-300 ease-in hover:scale-105 ">
      <div className="relative flex flex-col items-center justify-around pt-6 ">
        <IoTabletLandscapeOutline
          className="rounded "
          src=""
          alt=""
          fontSize={50}
          width={405}
          height={208}
        />
        <h2 className="pt-4 "> {props.title}</h2>
        <div className="px-6 pt-2 ">{props.desc}</div>
        <Link className="btn btn-outline-primary mb-8 mt-4" href={props.url}>
          {props.btn}
        </Link>
        {/* <p className="pb-6 pt-2">paragraph</p> */}
      </div>
    </div>
  );
};

export default Services;
