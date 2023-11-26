# HS Banking

## Application of Data Minining in Banking

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

HS Banking is a web platform for admin in banking which is used for predict loan application.

## Set up database:

Application using MySQL and using XAMPP to host database.
Install XAMPP [here](https://download.com.vn/xampp-for-windows-14235)
Create database **loan_data**.
Add file **loan_data.csv** in folder **models** into database. (Press select line: _The first line of the file contains the table column names ..._)

## Installation:

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install all package python for project.

```
pip install -r requirements.txt
```

Backend is located at **localhost:5000**. To run Backend server:

```
cd api/
flask --app routes run --debug
```

To run web project:

```
cd ..
npm start
```
