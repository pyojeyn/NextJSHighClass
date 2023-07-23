import { useRouter } from "next/router";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { route } from "next/router";

function MeetupItem(props) {
  const router = useRouter(); // 라우터 객체 받기

  function showDetailsHandler() {
    router.push("/" + props.id); // 이렇게 하면 새 페이지를 페이지 더미에 연결
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
