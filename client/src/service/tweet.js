export default class TweetService {
  //아래에서 base url을 http 이런식으로 가져올 수도 있지만 우리는 constructor에서 baseurl을 외부로부터 가져올 것임
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getTweets(username) {
    //전체 내용을 받아올 것인지 특정한 내용만 받아올 것인지 결정해야 해서 선언
    let query = username ? `?username=${username}` : ""; //username이 전달되면 username이라는 쿼리를 만들고 전달되지 않으면 빈 문자열
    //fetch를 사용해 서버에서 response를 가져옴(그래서 url을 전달해줌)
    const response = await fetch(`${this.baseURL}/tweets${query}`, {
      //옵션 정의
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    //받아온 데이터를 json으로 변환
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message); //성공하지 않아서 에러 던짐
    }
    return data; //다 완성된 되었다면(데이터를 다 받았다면) 데이터 return
  }

  async postTweet(text) {
    const response = await fetch(`${this.baseURL}/tweets/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //object를 json형태로 변환
        text,
        username: "ellie",
        name: "Ellie",
      }),
    });
    const data = await response.json();
    if (response.status !== 201) {
      throw new Error(data.message); //에러~
    }
    return data;
  }

  async deleteTweet(tweetId) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status !== 204) {
      throw new Error();
    }
  }

  async updateTweet(tweetId, text) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
}
