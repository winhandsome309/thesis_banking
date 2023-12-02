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
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, roc_curve, classification_report, precision_recall_curve
from sklearn.model_selection import cross_val_score, GridSearchCV, train_test_split, KFold
from sklearn.decomposition import PCA
from sklearn.decomposition import TruncatedSVD
from sklearn.utils import resample,shuffle

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

pickled_model = joblib.load(open('model.joblib', 'rb'))

df = pd.DataFrame([1,'debt_consolidation',0.1189,829.1,11.35040654,19.48,737,5639.958333,28854,52.1,0,0,0,0], ['credit_policy','purpose','int_rate','installment','log_annual_inc','dti','fico','days_with_cr_line','revol_bal','revol_util','inq_last_6mths','delinq_2yrs','pub_rec','not_fully_paid'])

df['purpose'].unique()

df = pd.get_dummies(data=df)
df = df.drop(['purpose_all_other'], axis=1)

# def log_transform(data, to_log):
#     X = data.copy()
#     for item in to_log:
#         # Add 1 to the data to prevent infinity values
#         X[item] = np.log(1+X[item])
#     return X

# to_log = ['credit_policy', 'int_rate', 'installment', 'dti', 'fico', 'days_with_cr_line', 'revol_bal', 'revol_util', 'inq_last_6mths', 'delinq_2yrs', 'pub_rec']
# df = log_transform(df, to_log)

print(df)


# result = pickled_model.predict(df)
# print(result)
