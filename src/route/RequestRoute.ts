import express from "express";
import { RequestController } from "../controller/RequestController";
import { RequestAxiosService } from "../services/RequestAxiosService";
const router = express.Router();

router.post("/insert", async (req, res) => {
  try {
    const payload = req.body;
    const result = await RequestController.requestCreate(payload);
    // console.log(result);
    res.send(JSON.stringify(result));
  } catch (error: any) {
    console.log(error);
    res.end(`{"error":"${error.message}"}`);
  }
});

router.get("/getrequest/:id", async (req, res) => {
  try {
    const key: string = req.params.id;
    // console.log('hi',key);

    const response = await RequestController.requestGet(key);
    // console.log(axiosserve.simNumber);
    res.json(response);
  } catch (error: any) {
    console.log(error);
    res.status(204).send(`{"error":"${error.message}"}`);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    console.log(id);

    const body: any = req.body;
    // console.log(status);

    const response = await RequestController.updateRequest(body, id);
    res.end(JSON.stringify(response));
  } catch (error) {
    res.end(`{"error":"${error.message}"}`);
  }
});

export { router };
