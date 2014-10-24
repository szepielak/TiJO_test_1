function setupBackendMock($httpBackend)
{
    'use strict';

    function decodeUriQuery(val, pctEncodeSpaces)
    {
        val = val.replace(/@/gi, '%40').replace(/:/gi, '%3A').replace(/\$/g, '%24').replace(/,/gi, '%2C');
        if (pctEncodeSpaces) {
            val = val.replace(/\+/g, '%20');
        }
        return decodeURIComponent(val);
    }

    function decodeUriSegment(val)
    {
        return decodeUriQuery(val, true).replace(/&/gi, '%26').replace(/=/gi, '%3D').replace(/\+/gi, '%2B');
    }

    function parseQueryString(url)
    {
        var args = url.split('?');
        args = args[1] || args[0];
        args = args.split('&');
        var result = {};
        var arg;
        for (var i = 0; i < args.length; i++) {
            arg = decodeURI(args[i]);

            if (-1 === arg.indexOf('=')) {
                result[arg.trim()] = true;
            } else {
                var kvp = arg.split('=');
                result[kvp[0].trim()] = kvp[1].trim();
            }
        }
        return result;
    }

    function randomPositiveInt(celling)
    {
        return Math.max(1, Math.round(Math.random() * (celling || 9)));
    }

    function loremIpsum(sentencesCount)
    {
        var sentences = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus quis felis et posuere. ' ,
                         'Nullam vel mauris id metus vestibulum vestibulum non non tortor. Vivamus ut congue sapien, in lobortis orci. ' ,
                         'Sed iaculis metus eget erat venenatis, id vestibulum massa scelerisque. ' ,
                         'Cras nunc leo, pellentesque sit amet interdum nec, pretium quis magna.'
        ];

        var result = '';
        for (var i = 0; i < sentencesCount; i++) {
            var index = Math.min(sentences.length - 1, Math.round(Math.random() * sentences.length));
            result += sentences[index];
        }
        return result;
    }

    var sequence = 1;
    var tasks = {};
    [
        {id: sequence++, title: 'Configure AngularJS routing', description: loremIpsum(2),
            repositoryUrl: 'https://github.com/aniaw/angular-exercises.git', branchName: 'exercise1',
            assignTo: [1, 2], tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Bind Posts From DAO', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Bind Posts', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Implement DAO', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Create CRUD', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Creating own DAO resource', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Using angular-xeditable', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Typeahead component', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Multilanguage using angular-gettext', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Pagination Support', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]},
        {id: sequence++, title: 'Configure backend mocking', description: loremIpsum(2), tags: [
            {id: 1, text: 'javascript'},
            {id: 2, text: 'bootstrap'}
        ]}
    ].every(function (value)
            {
                tasks[value.id] = value;
                return true;
            });

    $httpBackend.whenGET(/.*\.html/).passThrough();
}