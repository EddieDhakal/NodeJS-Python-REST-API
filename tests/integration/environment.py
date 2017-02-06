import os


def before_all(context):
    base_path = os.getcwd()
    context.sample_data_path = base_path + '/tests/integration/sample_data/'
    context.base_url = 'http://localhost:6543'


def before_scenario(context, scenario):
    context.http_headers = {'content-type': 'application/json'}
