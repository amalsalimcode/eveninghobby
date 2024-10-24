import sqlparse
from django.db.backends.utils import CursorDebugWrapper
from django.db import connection

# Function to pretty print the SQL queries
def pretty_print_sql(sql, params=None):
    formatted_sql = sqlparse.format(sql, reindent=True, keyword_case='upper')
    print(f"\nSQL Query:\n{formatted_sql}\n")
    if params:
        print(f"Params: {params}")
    print('-' * 80)

# Override the `execute` and `executemany` methods of `CursorDebugWrapper` to log SQL
def custom_execute(self, sql, params=None):
    result = self._orig_execute(sql, params)  # Call the original execute method
    pretty_print_sql(sql, params)  # Print the query nicely
    return result

def custom_executemany(self, sql, param_list):
    result = self._orig_executemany(sql, param_list)  # Call the original executemany
    pretty_print_sql(sql)  # Print the query
    return result

# Patch the original methods with the custom ones
CursorDebugWrapper._orig_execute = CursorDebugWrapper.execute
CursorDebugWrapper._orig_executemany = CursorDebugWrapper.executemany
CursorDebugWrapper.execute = custom_execute
CursorDebugWrapper.executemany = custom_executemany

