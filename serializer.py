from django.core import serializers

# get a list of objects
user_list = list(User.objects.all())

# convert objects to a string
serialized_str = serializers.serialize('json', si_slot_lst)

# convert string back to list of objects
# note: deserialize always returns a list
deserialized_obj = serializers.deserialize('json', serialized_str)

# convert list of deserialized objects to original objects
for deserialized_each in deserialized_obj:
    post_user_list.append(deserialized_each.object)

assertEqual(user_list, post_user_list)
