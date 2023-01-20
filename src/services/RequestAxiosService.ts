import axios from "axios";

export class RequestAxiosService {
  static async getSim(key: string) {
    const response = await axios.get(
      `http://localhost:3000/status/${key}`
    );
    return response.data;
  }
}
