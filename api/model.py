import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from timeit import default_timer as timer
import time

# Plot
import matplotlib.pyplot as plt
import seaborn as sns

# Components of models
from sklearn.manifold import TSNE
from sklearn.svm import SVR
from sklearn.feature_selection import RFE
from sklearn.feature_selection import RFECV
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import (
    confusion_matrix,
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    roc_curve,
    classification_report,
    precision_recall_curve,
)
from sklearn.model_selection import (
    cross_val_score,
    GridSearchCV,
    train_test_split,
    KFold,
)
from sklearn.decomposition import PCA
from sklearn.decomposition import TruncatedSVD
from sklearn.utils import resample, shuffle

# Evaluate result of models
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.metrics import roc_curve

# Dealing with classification with imbalance classes
from imblearn.pipeline import Pipeline, make_pipeline
from imblearn.over_sampling import SMOTE

# Storing model
from joblib import Parallel, delayed
import joblib

# pickled_model = joblib.load(open('model.joblib', 'rb'))

# df = pd.DataFrame(
#     {
#         "credit_policy": [1, 1],
#         "purpose": ["debt_consolidation", "credit_card"],
#         "int_rate": [0.1189, 0.1071],
#         "installment": [829.1, 228.22],
#         "log_annual_inc": [11.35040654, 11.08214255],
#         "dti": [19.48, 14.29],
#         "fico": [737, 707],
#         "days_with_cr_line": [5639.958333, 2760],
#         "revol_bal": [28854, 33623],
#         "revol_util": [52.1, 76.7],
#         "inq_last_6mths": [0, 0],
#         "delinq_2yrs": [0, 0],
#         "pub_rec": [0, 0],
#     }
# )


# Load data from the CSV file
df = pd.read_csv("history_loan_data.csv", index_col=None)

# Change the dots in the column names to underscores
df.columns = [col.replace(".", "_") for col in df.columns]

# Split columns by data type
num = [
    "credit_policy",
    "int_rate",
    "installment",
    "log_annual_inc",
    "dti",
    "fico",
    "days_with_cr_line",
    "revol_bal",
    "revol_util",
    "inq_last_6mths",
    "delinq_2yrs",
    "pub_rec",
]
non_num = ["purpose"]


# Log transform function
def log_transform(data, to_log):
    X = data.copy()
    for item in to_log:
        # Add 1 to the data to prevent infinity values
        X[item] = np.log(1 + X[item])
    return X


df["purpose"].unique()

df_e = pd.get_dummies(data=df)
# df_e = df.drop(["purpose_all_other"], axis=1)

# Log transform
to_log = [
    "credit_policy",
    "int_rate",
    "installment",
    "dti",
    "fico",
    "days_with_cr_line",
    "revol_bal",
    "revol_util",
    "inq_last_6mths",
    "delinq_2yrs",
    "pub_rec",
]
df_e_l = log_transform(df_e, to_log)

df_e_l.head()

scaler = StandardScaler()
scaler.fit(df_e_l)
tmp_train = scaler.transform(df_e_l)
df_e_l_n = pd.DataFrame(data=tmp_train, index=df_e.index, columns=df_e.columns)
df_e_l_n.head()


# result = pickled_model.predict(df)
# print(result)
