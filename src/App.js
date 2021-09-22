import React from "react";
import "./App.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { AiOutlineStar, AiFillStar, AiFillDelete } from "react-icons/ai";
import * as Components from "./components";
function App() {
  let [newFriend, setNewFriend] = React.useState("");
  let pageLength = 4;
  let [from, setFrom] = React.useState(1);
  let [to, setTo] = React.useState(4);
  let [favoSort, setFavoSort] = React.useState(true);
  let [sortActive, setSortActive] = React.useState(false);
  let [nameSearch, setNameSearch] = React.useState("");
  let schema = { name: "", favourite: false };
  let [friends, setFriends] = React.useState([
    {
      name: "Nafis Ahmed",
      favourite: true,
      id: 1,
    },
    {
      name: "Javed Khan",
      favourite: false,
      id: 2,
    },
    {
      name: "Shamshad Chaudhary",
      favourite: false,
      id: 3,
    },
    {
      name: "Ismail",
      favourite: false,
      id: 4,
    },
    {
      name: "Farhan",
      favourite: false,
      id: 5,
    },
    {
      name: "Sharad",
      favourite: true,
      id: 6,
    },
    {
      name: "Nilesh",
      favourite: false,
      id: 7,
    },
    {
      name: "Theja",
      favourite: false,
      id: 8,
    },
    {
      name: "Vaibhav",
      favourite: false,
      id: 9,
    },
    {
      name: "Puli",
      favourite: false,
      id: 10,
    },
  ]);

  let addToFavorites = (id) => {
    let index = friends.map((f) => f.id).indexOf(id);
    let cloneFriends = [...friends];
    cloneFriends[index].favourite = true;
    setFriends(cloneFriends);
  };

  let removeFromFavorites = (id) => {
    let index = friends.map((f) => f.id).indexOf(id);
    let cloneFriends = [...friends];
    cloneFriends[index].favourite = false;
    setFriends(cloneFriends);
  };

  let getPaginatedData = (from, to) => {
    if (favoSort && sortActive) {
      console.log("favrites top");
      return friends
        .filter((x) => x.name.toLowerCase().includes(nameSearch.toLowerCase()))
        .sort(function (x, y) {
          return x.favourite === y.favourite ? 0 : x.favourite ? -1 : 1;
        })
        .slice(from - 1, to);
    } else if (!favoSort && sortActive) {
      console.log("favrites bottom");
      return friends
        .filter((x) => x.name.toLowerCase().includes(nameSearch.toLowerCase()))
        .sort(function (x, y) {
          return x.favourite === y.favourite ? 0 : x.favourite ? 1 : -1;
        })
        .slice(from - 1, to);
    } else {
      console.log("not sort");
      return friends
        .filter((x) => x.name.toLowerCase().includes(nameSearch.toLowerCase()))
        .slice(from - 1, to);
    }
  };

  const fullFiltereData = () => {
    return friends.filter((x) =>
      x.name.toLowerCase().includes(nameSearch.toLowerCase())
    );
  };

  const addNewFriend = () => {
    if (!newFriend) {
      return alert("Please enter friend name and submit");
    } else {
      setNewFriend("");
      setFriends([...friends, { ...schema, name: newFriend }]);
    }
  };

  let deleteFriend = (id) => {
    let index = friends.map((f) => f.id).indexOf(id);
    let newFriends = [...friends];
    newFriends.splice(index, 1);
    setFriends(newFriends);
  };

  let filteredFriends = getPaginatedData(from, to);
  let fullFilteredData = fullFiltereData();

  let onNext = () => {
    setFrom(from + pageLength);
    setTo(to + pageLength);
  };

  let onPrevious = () => {
    setFrom(from - pageLength);
    setTo(to - pageLength);
  };

  let friendList = filteredFriends.map((friend, index) => {
    return (
      <Card key={"friend-" + index}>
        <Card.Body>
          <Row>
            <Col lg={8} md={8} sm={8} xs={8}>
              <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                  {friend.name}
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                  <span style={{ color: "gray" }}>is your friend</span>
                </Col>
              </Row>
            </Col>
            <Col className="flex-end-and-center" lg={4} md={4} sm={4} xs={4}>
              <Row>
                <Col md={6} sm={6} xs={6}>
                  <AiFillDelete
                    onClick={() => deleteFriend(friend.id)}
                    className="icon-large"
                  />
                </Col>
                <Col md={6} sm={6} xs={6}>
                  {friend.favourite ? (
                    <AiFillStar
                      onClick={() => removeFromFavorites(friend.id)}
                      style={{ color: "#ffbc00" }}
                      className="icon-large"
                    />
                  ) : (
                    <AiOutlineStar
                      onClick={() => addToFavorites(friend.id)}
                      className="icon-large"
                    />
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  });

  console.log(from, to, "from to");

  return (
    <Container>
      <Container fluid>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <Card style={{ background: "#f1f1f1" }}>
              <Card.Body>
                <h1>Friends List</h1>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={6} sm={6} xs={12} className="mb-2  ">
                    <Components.CustomInput
                      placeholder={"Enter your friend's name"}
                      value={nameSearch}
                      onChange={(e) => setNameSearch(e.target.value)}
                    />
                  </Col>
                  <Col
                    md={6}
                    sm={6}
                    xs={12}
                    className="flex-end-and-center mb-2"
                  >
                    <Components.CustomButton
                      onClick={() => setFavoSort(!favoSort)}
                      style={sortActive ? { background: "green" } : {}}
                    >
                      {favoSort ? "Favourites on Bottom" : "Favourites on Top"}
                    </Components.CustomButton>
                    <Components.CustomButton
                      onClick={() => setSortActive(!sortActive)}
                      style={sortActive ? { background: "green" } : {}}
                    >
                      {sortActive ? "Sorting On" : "Sorting Off"}
                    </Components.CustomButton>
                  </Col>
                  <Col md={12} className="flex-end-and-center mb-2">
                    <span style={{ padding: "5px" }}>
                      Page {parseInt(to) / pageLength} of{" "}
                      {Math.round(fullFilteredData.length / pageLength)} (Total:{" "}
                      {fullFilteredData.length})
                    </span>
                    <Components.CustomButton
                      disabled={from - 1 <= 0}
                      onClick={() => onPrevious()}
                    >
                      Previous
                    </Components.CustomButton>
                    <Components.CustomButton
                      disabled={fullFilteredData.length <= to}
                      onClick={() => onNext()}
                    >
                      Next
                    </Components.CustomButton>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            {friendList}
            <Card>
              <Card.Body>
                <Row>
                  <Col md={6} sm={6} xs={12} className="mb-2  ">
                    <Components.CustomInput
                      placeholder={"name"}
                      value={newFriend}
                      onChange={(e) => setNewFriend(e.target.value)}
                    />
                    <Components.CustomButton
                      className="mt-2"
                      onClick={() => addNewFriend()}
                    >
                      Add New Friend
                    </Components.CustomButton>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default App;
