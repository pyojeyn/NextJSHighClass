import { useRouter } from "next/router";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";
function NewMeetUpPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log("data", data);

    router.push("/");
  }

  // addMeetupHandler 포인터
  return (
    <>
      <Head>
        <title>Add a New Meetups</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities!"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}

export default NewMeetUpPage;
