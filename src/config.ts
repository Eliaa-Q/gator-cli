import fs from "fs";
import os from "os";
import path from "path";


export type Config = {
dbUrl:string;
currentUserName?: string;
};

//Helper functions!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Returns full path to ~/.gatorconfig.json
function getConfigFilePath(): string {
  return path.join(os.homedir(), ".gatorconfig.json");
}

function validateConfig(rawConfig: any): Config {
  if (!rawConfig.db_url) {
    throw new Error("Invalid config: db_url is required");
  }

  return {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name,
  };
}

//sets user and url 
function writeConfig(cfg: Config): void {
  const filePath = getConfigFilePath();

  const rawConfig = {
    db_url: cfg.dbUrl,
    current_user_name: cfg.currentUserName,
  };

  fs.writeFileSync(filePath, JSON.stringify(rawConfig, null, 2));
}
export function readConfig(): Config {
  const filePath = getConfigFilePath();

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(fileContents);

  return validateConfig(parsed);
}


//Exported: Sets current user and writes to disk
export function setUser(userName: string): void {
  const cfg = readConfig();
  cfg.currentUserName = userName;
  writeConfig(cfg);
}
