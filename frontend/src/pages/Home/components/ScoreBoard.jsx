import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import { Avatar } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Safe from "./utilsComponents/Safe";

//get user name and use useState
const HomeScoreBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((state) => state.auth);
  const [realName, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [userImg, setUserImg] = useState("");
  useEffect(() => {
    setUsername(user.realName);
    setScore(user.score);
    setUserImg("");
  }, [user]);
  const reader = new FileReader();
  const thereIsChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    reader.readAsText(file, "UTF-8");
    reader.onload = (e) => {
      const placeholder = document.getElementById("text");
      placeholder.innerHTML = e.target.result;
    };
  };

  return (
    <div className="flex flex-col items-center m-10 p-2 gap-2">
      <Avatar name={realName} src={userImg} />
      <span>You Score is: {score}</span>
      <Button colorScheme="teal" onClick={onOpen}>
        show leader board
      </Button>
      {/* <input type="file" onChange={thereIsChange}/> */}
      {/* <div id="text"></div> */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        motionPreset="scale"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Leader Boards</ModalHeader>
          <ModalCloseButton />
          <ModalBody>table of score hellow</ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button> */}
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default HomeScoreBoard;
