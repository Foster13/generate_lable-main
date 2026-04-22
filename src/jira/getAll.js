import axios from "axios";
import {
  JIRA_BASE_URL,
  JIRA_VERSION_NAME,
  JIRA_CYCLE_NAME,
  JIRA_PAGINATION,
  JIRA_LABELS
} from "../utils/constans.js"; 

export async function getAll(authHeader) {
  const version = encodeURIComponent(JIRA_VERSION_NAME);
  const cycle = encodeURIComponent(JIRA_CYCLE_NAME);
  const labels = encodeURIComponent(JIRA_LABELS);

  let offset = 0;

  // convert pagination parameter
  if (JIRA_PAGINATION === "1" || JIRA_PAGINATION === "") {
    offset = 0;
  } else {
    offset = JIRA_PAGINATION * 20 - 20;
  }

  const url = `${JIRA_BASE_URL}/rest/zapi/latest/zql/executeSearch?zqlQuery=fixVersion%20%3D%20"${version}"%20AND%20cycleName%20in%20("${cycle}")%20and%20labels%20in%20(${labels})&view=list&searchType=advance&offset=${offset}&maxRecords=20`;
  console.log("🔗 JIRA URL:", url);

  const res = await axios.get(url, {
    headers: {
      Authorization: authHeader,
      Accept: "application/json",
    },
  });

  return res.data.executions;
}