"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from django.test import TestCase
from tastypie.test import ResourceTestCase

from apps.storybase_badge.models import Badge
from apps.storybase_user.models import User


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

        objects = self.deserialize(resp)['objects']

        self.assertHttpOK(resp)
        self.assertValidJSONResponse(resp)
        self.assertEqual(len(objects), 2)

        self.assertEquals(objects[0], {
            u'id': self.b1.pk,
            u'name': u'Denver Foundation',
            u'description': u'A member of the Denver Foundation sponsored this story.',
            u'icon_uri': u'',
            u'resource_uri': u'/api/0.1/badges/{0}/'.format(self.b1.pk)
        })


class TestBadgePermissions(TestCase):

    def setUp(self):
        super(TestCase, self).setUp()

        self.regular_user = User.objects.create_user('john', 'lennon@thebeatles.com', 'django-password')
        self.regular_user.is_staff = False
        self.regular_user.save()

        self.staff_user = User.objects.create_user('matt', 'matt@floodlightproject.org', 'on-the-other-side')
        self.staff_user.is_staff = True
        self.staff_user.save()

    def test_regular_user_badge(self):
        b = Badge()
        self.assertFalse(b.can_add(self.regular_user))
        self.assertFalse(b.can_remove(self.regular_user))

    def test_super_user_badge(self):
        b = Badge()
        self.assertTrue(b.can_add(self.staff_user))
        self.assertTrue(b.can_remove(self.staff_user))


