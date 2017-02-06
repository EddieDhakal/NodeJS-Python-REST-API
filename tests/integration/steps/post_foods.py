import json

from behave import *
import requests


@given('I want to get a summarised list of special foods')
def _(context):
    pass


@given('I am posting some data without explicitly setting request data format')
def _(context):
    if 'content-type' in context.http_headers:
        del context.http_headers['content-type']


@given('I am posting some data with data format "{content_type}"')
def _(context, content_type):
    context.http_headers['content-type'] = content_type


@when('posted "{request_file_name}"')
def _(context, request_file_name):
    with open(context.sample_data_path + request_file_name, 'rb') as request_file:
        try:
            response = requests.post(
                context.base_url,
                data=request_file.read(),
                headers=context.http_headers
            )
            context.response = response
        except:
            assert False


@then('I should be notified with an invalid data posted error')
def _(context):
    assert json.loads(context.response) == {
        'error': 'Could not decode request: JSON parsing failed'
    }


@then('I should get a bad request error')
def _(context):
    actual_status_code = context.response.status_code
    expected_status_code = 400
    assert actual_status_code == expected_status_code


@then('I should get a good request acknowledgement')
def _(context):
    actual_status_code = context.response.status_code
    expected_status_code = 200
    assert actual_status_code == expected_status_code


@then('error message as in "{error_file_name}"')
def _(context, error_file_name):
    """
    Unknown and unsupported content-type have the same error response
    :param context:
    :return:
    """
    error_file_path = context.sample_data_path + error_file_name
    with open(error_file_path) as error_file:
        expected_response = json.loads(error_file.read())
        response_content = str(context.response.content, 'utf-8')
        actual_response = json.loads(response_content)
        print(error_file_name)
        assert actual_response == expected_response


@then('parsed foods as in "{parsed_food_file_name}"')
def _(context, parsed_food_file_name):
    file_path = context.sample_data_path + parsed_food_file_name
    with open(file_path) as file:
        expected_response = json.loads(file.read())
        response_content = str(context.response.content, 'utf-8')
        actual_response = json.loads(response_content)
        assert actual_response == expected_response
        assert len(actual_response['response']) == len(expected_response['response'])
