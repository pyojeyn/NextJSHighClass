import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browes a huge list of higly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
}

// 지정된 이름 next.js 가 얘를 찾을 것임
// 이 함수는 빌드 프로세스 중에는 실행되지 않는다는 겁니다.
// 하지만 대신 배열 다음에 서버에서 실행됩니다.
// getServerSideProps 함수는 요청이 들어올 때마다 실행됩니다.
// 따라서 시간을 지정해서 revalidate 할 필요가 없습니다.
// export async function getServerSideProps(context) {
//   const req = context.req; // 요청 객체
//   const res = context.res; // 응답 객체
//   //fetch
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// NextJS는 이 이름을 가진 함수를 찾을 것임
// 발견하면 이 사전 렌더링 프로세스 중에 이 함수를 실행합니다
// NextJS는 이 promise가 해결될 때까지 기다립니다
export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect("mongodb://localhost:27017/meetup");
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    // 이름 반드시 props, 이 props 객체의 구조는 여러분 마음대로 정하실 수 있습니다
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    //추가하면 점진적 정적 생성이라는 기능 사용 가능
    // NextJS가 대기하는 시간을 초 단위로 표시 10
    revalidate: 10,
  };
}

export default HomePage;

/**
 * 즉 revalidate에 어떤 숫자가 설정되어 있으면 페이지는 빌드 프로세스 중에 바로 생성되지 않는다.
   생성되긴 하겠지만 바로는 아님, 적어도 이 페이지에 요청이 있다면 서버에서 몇 초 간격으로 생성될 것임. 
   다시 말해서 revalidate 값이 10이라면 이 페이지에 요청이 들어오면 적어도 10초마다 서버에서 페이지를 다시 생성한다는 것임. 
   이 다시 만들어진 페이지들은 사전에 생성했던 오래된 페이지를 대체합니다. 
   이렇게 하면 데이터가 절대 10초보다 오래되지는 않겠죠.  
   여기서 사용하는 숫자는 데이터 업데이트 빈도에 따라 결정하면 됩니다. 
   데이터가 한 시간마다 변하는 경우엔 3600으로 설정하는거 추천.
   항상 변하고 있다면 1초로 해야 할 것임. 
   그러나 이 숫자를 무엇으로 설정하든 이 페이지는 배포 후 서버에서 때때로 다시 사전 생성할 것임.
   그러니 일부 데이터가 변경되었다고 해서 매번 다시 빌드하고 배포할 필요는 없음.
 */
