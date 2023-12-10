import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  FormControl,
  FormLabel,
  Select,
  CircularProgress,
  CircularProgressLabel,
  Box,
  Center,
  Divider,
  SimpleGrid,
  Spinner,
  Img,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import Menu from "../../../../components/menu/MainMenu";
import { HSeparator } from "../../../../components/separator/Separator";
import React, { useState, useEffect, useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import axios from "axios";
import { IoFastFood } from "react-icons/io5";

export default function ResultModel({ typeModel }) {
  const [precision, setPrecision] = useState(80);
  const [recall, setRecall] = useState(40);
  const [fmeasure, setFmeasure] = useState(60);
  const [AUC, setAUC] = useState(100);
  const [img, setImg] = useState(null);
  const [img1, setImg1] = useState(false);
  const [img2, setImg2] = useState(false);
  const [img3, setImg3] = useState(false);
  const [resultModel, setResultModel] = useState([]);

  const fetchImg = async () => {
    axios
      .get(window.link + "/admin/image", { params: { typeModel: typeModel } })
      .then((response) => {
        setImg(response.data);
      });
  };
  const colorAccuracy = (score) => {
    if (score < 30) return "red";
    else if (score < 60) return "yellow";
    return "green.400";
  };
  const colorPrecision = (score) => {
    if (score < 30) return "green.400";
    else if (score < 60) return "yellow";
    return "red";
  };
  const fetchResultModel = async () => {
    axios
      .get(window.link + "/admin/result-model", {
        params: { typeModel: typeModel },
      })
      .then((response) => {
        setResultModel(response.data[0]);
      });
  };

  useEffect(() => {
    setImg1(false);
    setImg2(false);
    setImg3(false);
    fetchResultModel();
    fetchImg();
  }, [typeModel]);

  return (
    <div>
      <Flex pl={"300px"} pr={"300px"} pt={"10px"}>
        <HSeparator mb="20px" />
      </Flex>
      {img1 && img2 && img3 ? (
        <Flex
          justify={"space-between"}
          align={"center"}
          ml={"40px"}
          mr={"40px"}
          mt={"20px"}
        >
          <div>
            <CircularProgress
              value={resultModel["accuracy"]}
              color={colorAccuracy(parseInt(resultModel["accuracy"]))}
              size="150px"
            >
              <CircularProgressLabel>
                {resultModel["accuracy"]}%
              </CircularProgressLabel>
            </CircularProgress>
            <Center>
              <Text>Accuracy</Text>
            </Center>
          </div>
          <div>
            <CircularProgress
              value={resultModel["precision"]}
              color={colorPrecision(parseInt(resultModel["precision"]))}
              size="150px"
            >
              <CircularProgressLabel>
                {resultModel["precision"]}%
              </CircularProgressLabel>
            </CircularProgress>
            <Center>
              <Text>Precision</Text>
            </Center>
          </div>
          <div>
            <CircularProgress
              value={resultModel["recall"]}
              color={colorPrecision(parseInt(resultModel["recall"]))}
              size="150px"
            >
              <CircularProgressLabel>
                {resultModel["recall"]}%
              </CircularProgressLabel>
            </CircularProgress>
            <Center>
              <Text>Recall</Text>
            </Center>
          </div>
          <div>
            <CircularProgress
              value={resultModel["auc"]}
              color={colorAccuracy(parseInt(resultModel["auc"]))}
              size="150px"
            >
              <CircularProgressLabel>
                {resultModel["auc"]}%
              </CircularProgressLabel>
            </CircularProgress>
            <Center>
              <Text>AUC</Text>
            </Center>
          </div>
        </Flex>
      ) : (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}
      <Flex pl={"300px"} pr={"300px"} pt={"40px"}>
        <HSeparator mb="20px" />
      </Flex>
      {(!img1 || !img2 || !img3) && (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}
      {img !== null && (
        <SimpleGrid columns={1} justifyItems={"center"} pt={"50px"}>
          <Box height={"550px"} width={"600px"}>
            <img
              style={img1 ? {} : { display: "none" }}
              src={img[0]["img_url"]}
              alt="drive image"
              onLoad={() => setImg1(true)}
            />
          </Box>
          <Box height={"550px"} width={"600px"}>
            <img
              style={img2 ? {} : { display: "none" }}
              src={img[1]["img_url"]}
              alt="drive image"
              onLoad={() => setImg2(true)}
            />
          </Box>
          <Box height={"500px"} width={"600px"}>
            <img
              style={img3 ? {} : { display: "none" }}
              src={img[2]["img_url"]}
              alt="drive image"
              onLoad={() => setImg3(true)}
            />
          </Box>
        </SimpleGrid>
      )}
    </div>
  );
}
