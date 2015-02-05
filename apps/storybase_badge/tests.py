"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

import json
from apps.storybase_badge.models import Badge
from tastypie.test import ResourceTestCase


class TestBadgeResource(ResourceTestCase):

    def setUp(self):
        super(TestBadgeResource, self).setUp()

        self.b1 = Badge.objects.create(
            name='Denver Foundation',
            description='A member of the Denver Foundation sponsored this story.'
        )

        self.b2 = Badge.objects.create(name='Thought Leader')

    def test_getting_badges(self):

        resp = self.api_client.get('/api/0.1/badges/', format='json')
        print(resp)
        objects = self.deserialize(resp)['objects']

        self.assertHttpOK(resp)
        self.assertValidJSONResponse(resp)
        self.assertEqual(len(objects), 2)

        self.assertEquals(objects[0], {
            'pk': str(self.b1.pk),
            'name': 'Denver Foundation',
            'description': 'A member of the Denver Foundation sponsored this story.',
            'icon_uri': None,
            'resource_uri': '/api/0.1/badges/{0}/'.format(self.b1.pk)
        })

