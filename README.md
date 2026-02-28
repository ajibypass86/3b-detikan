# 3B API Project

Backend aman untuk 3B Detikan.

## Endpoints

- POST `/api/login`  
  Body: `{id: "admin", pin: "1208"}` → validasi login

- POST `/api/process-imei`  
  Body: `{imeis: ["353084308480141","356328100097075"]}` → proses IMEI

## Deploy ke Render.com

- Node.js Web Service  
- Start Command: `npm start`  
- Port: `process.env.PORT`  
- Plan: Free