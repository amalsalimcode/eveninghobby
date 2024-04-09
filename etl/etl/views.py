from django.http import JsonResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .models import Consumer

def get_consumers(request):
    # Get query parameters

    allowed_params = {'min_balance', 'max_balance', 'consumer_name', 'status', 'page'}
    if len(request.GET.keys() - allowed_params) > 0:
        return JsonResponse({"error": "Unauthorized params requested"}, status=401)

    min_balance = request.GET.get('min_balance')
    max_balance = request.GET.get('max_balance')
    consumer_name = request.GET.get('consumer_name')
    status = request.GET.get('status')

    # Get all consumers
    consumers = Consumer.objects.all()

    # Apply filters
    if min_balance:
        consumers = consumers.filter(balance__gte=min_balance)
    if max_balance:
        consumers = consumers.filter(balance__lte=max_balance)
    if consumer_name:
        consumers = consumers.filter(name__icontains=consumer_name)
    if status:
        consumers = consumers.filter(status=status)

    # Pagination
    paginator = Paginator(consumers, 10)  # 10 items per page
    page_number = request.GET.get('page')
    try:
        consumers_page = paginator.page(page_number)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        consumers_page = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        consumers_page = paginator.page(paginator.num_pages)

    # Serialize the paginated consumers
    serialized_consumers = [{'client_reference_no': consumer.client_reference_no,
                             'balance': consumer.balance,
                             'status': consumer.status,
                             'name': consumer.name,
                             'address': consumer.address,
                             'ssn': consumer.ssn} for consumer in consumers_page]

    return JsonResponse({
        'results': serialized_consumers,
        'total_pages': paginator.num_pages,
        'current_page': consumers_page.number,
        'has_next': consumers_page.has_next(),
        'has_previous': consumers_page.has_previous()
    })
